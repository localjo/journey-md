#! /usr/bin/env node
const fs = require('fs');
const moment = require('moment');
const argv = require('minimist');
const glob = require('glob');
const _ = require('lodash');
const { htmlToText } = require('html-to-text');

const convertJSONtoMarkdown = () => {
    const args = argv(process.argv.slice(2));
    const { source, dest, allKeys } = args;
    if (!fs.existsSync(source)) throw new Error('Source does not exist');
    if (!fs.existsSync(dest)) throw new Error(`Destination ${dest} does not exist`);
    glob(`${source}*.json`, null, function (er, files) {
        if (!files.length > 0) return;
        files.forEach(file => {
            fs.readFile(file, 'utf8', function (err, data) {
                if (err) throw err;
                obj = JSON.parse(data);
                const date = moment(obj.date_journal);
                const text = htmlToText(obj.text);
                const { month, day, year, time } = {
                    month: date.format('MM'),
                    day: date.format('DD'),
                    year: date.format('YYYY'),
                    time: date.format('HHMMSS')
                }
                const filePath = `${dest}/${year}/${month}/${day}/`
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, { recursive: true })
                }
                const meta = allKeys
                    ? _.omit(obj, ['id', 'text'])
                    : _.pick(obj, [
                        'timezone',
                        'mood',
                        'lat',
                        'lon',
                        'address',
                        'label',
                        'folder',
                        'photos',
                        'weather',
                        'tags'
                    ])
                const frontMatter = Object.keys(_.pickBy(meta, (val)=> _.isArray(val) ? _.some(val) : _.identity(val))).map(key => {
                    if (key === 'photos') {
                        obj[key].forEach(photoPath => {
                            fs.copyFileSync(`${source}/${photoPath}`, `${filePath}${photoPath}`, (err) => {
                                if (err) throw err;
                                console.log('File was copied to destination');
                              });
                        })
                    }
                    return `${key}: ${_.isArray(obj[key]) ? obj[key].join(', ') : JSON.stringify(obj[key])}`
                }).join('\n');
                let md = `
---
date: ${date.format('YYYY-MM-DD HH:MM:SS')}
${frontMatter}
---
${text}

`
                fs.writeFileSync(`${filePath}${time}.md`, md);
            });
        })
    })
}

convertJSONtoMarkdown();