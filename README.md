# `journey-md`

This is a quick and dirty script to convert a [Journey](https://journey.cloud/) export into markdown files with frontmatter.

## Usage

### Export from Journey

1. Journey > Preferences > Database > Bulk Export > Select Journal Entries

2. Choose Format ZIP, and the options you want then click OK.

3. Extract the ZIP. The result will be a directory of JSON files and images.

### Convert to Markdown

```
journey-convert --source ~/path/to/journey/json/files --dest ~/markdown/dest/path --allKeys
```

By default only some keys of the JSON files are converted to frontmatter, if you're worried about data loss, you can use `--allKeys` to keep everything, but it may be a bit noisy.

This command will convert all of the Journey JSON files to markdown, and copy any referenced photos into the corresponding directory.

## Disclaimer

I made this as a quick and dirty script to convert my own Journey entries into markdown to use with my self hosted Nextcloud installation and the [`vscode-journal` extension](https://marketplace.visualstudio.com/items?itemName=pajoma.vscode-journal) for VS Code.

You can use this to convert your Journey entries to plain markdown files in an organized directory, but it may not be reliable, so don't blame me if anything goes wrong. Feel free to modify the script for your own use.
