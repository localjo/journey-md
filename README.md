# `journey-md`

This is a quick and dirty script to convert a Journey export into markdown files with frontmatter.

## Usage

### Export from Journey

1. Journey > Preferences > Database > Bulk Export > Select Journal Entries

2. Choose Format ZIP, and the options you want then click OK.

3. Extract the ZIP into JSON files.

### Convert to Markdown

```
journey-convert --source ~/path/to/journey/json/files --dest ~/markdown/dest/path --allKeys
```

By default only some keys of the JSON files are converted to frontmatter, if you're worried about data loss, you can use `--allKeys` to keep everything, but it may be a bit noisy.