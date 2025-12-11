#!/usr/bin/env ruby
# frozen_string_literal: true

require "yaml"

GLYPH_FILE = File.expand_path("../glyph.yml", __dir__)
README_FILE = File.expand_path("../README.md", __dir__)
START_MARKER = "<!-- GLYPH_TABLE_START -->"
END_MARKER = "<!-- GLYPH_TABLE_END -->"
REQUIRED_KEYS = %w[name kind contract network repo description].freeze
KIND_ORDER = %w[svg utility palette layout other].freeze
DESCRIPTION_MAX = 140

def load_glyphs(path)
  data = YAML.load_file(path)
  raise "Top-level YAML must be a sequence" unless data.is_a?(Array)

  errors = []
  glyphs = []

  data.each_with_index do |entry, idx|
    next if entry.nil?
    unless entry.is_a?(Hash)
      errors << "Entry #{idx + 1} is not a mapping"
      next
    end

    missing = REQUIRED_KEYS.select { |key| entry[key].nil? || entry[key].to_s.strip.empty? }
    if missing.any?
      name = entry["name"] || "entry #{idx + 1}"
      errors << "#{name}: missing required keys: #{missing.join(', ')}"
      next
    end

    glyphs << entry
  end

  raise "Invalid glyph entries:\n- #{errors.join("\n- ")}" if errors.any?
  glyphs
end

def ordered_kinds(grouped)
  known = KIND_ORDER & grouped.keys
  unknown = grouped.keys - KIND_ORDER
  known + unknown.sort
end

def short_contract(addr)
  value = addr.to_s.strip
  return "`#{value}`" if value.length <= 13

  "`#{value[0, 6]}...#{value[-5, 5]}`"
end

def tidy_description(desc)
  clean = desc.to_s.gsub(/\s+/, " ").strip
  return clean if clean.length <= DESCRIPTION_MAX

  "#{clean[0, DESCRIPTION_MAX - 3].rstrip}..."
end

def escape_pipes(text)
  text.to_s.gsub("|", "\\|")
end

def render_tables(glyphs)
  grouped = glyphs.group_by { |g| g["kind"].to_s.strip.downcase }
  kind_order = ordered_kinds(grouped)

  blocks = kind_order.map do |kind|
    entries = grouped[kind]
    next if entries.nil? || entries.empty?

    lines = []
    lines << "### #{kind}"
    lines << ""
    lines << "| name | network | contract | repo | description |"
    lines << "| ---- | ------- | -------- | ---- | ----------- |"

    entries.sort_by { |g| g["name"].downcase }.each do |g|
      contract = short_contract(g["contract"])
      repo = "[repo](#{g['repo']})"
      description = escape_pipes(tidy_description(g["description"]))
      lines << "| #{g['name']} | #{g['network']} | #{contract} | #{repo} | #{description} |"
    end

    lines << ""
    lines.join("\n")
  end.compact

  blocks.join("\n")
end

def replace_table(content, table_block)
  unless content.include?(START_MARKER) && content.include?(END_MARKER)
    raise "Could not find table markers in README (#{START_MARKER}/#{END_MARKER})"
  end

  content.sub(/#{START_MARKER}.*?#{END_MARKER}/m, "#{START_MARKER}\n\n#{table_block}\n#{END_MARKER}")
end

glyphs = load_glyphs(GLYPH_FILE)
table_block = render_tables(glyphs)

readme = File.read(README_FILE)
updated = replace_table(readme, table_block)
File.write(README_FILE, updated)

puts "Updated README glyph table from #{File.basename(GLYPH_FILE)}"
