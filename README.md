# Regex Compressor

Regex Compressor is a TypeScript library intended to take a list of strings and generate a compact, regex that matches those exact strings.


## Installation

`npm install regex-compressor`

## Usage

`import compressList from 'regex-compressor';`

This example shortens the regex by two characters, and also improves the regex performance because it won't have to check the "aaaa" prefix 4 times when matching "aaaad", only once. This can have a large impact on performance.

`compressList(["aaaab", "aaaac", "aaaad", "aaaae"])` => `"aaaa[bcde]"`

`compressList(["foo", "bar", "baz"])` => `"foo|ba[rz]"`

To get a regex format (staring with `^` and ending with `$`) use the config field to receive this in that format.

`compressList(["aaaab", "aaaac", "aaaad", "aaaae"], {regex: true})` => `"^aaaa[bcde]$"`

`compressList(["foo", "bar", "baz"], {regex: true})` => `"^foo|ba[rz]$"`

## Notes

This should have improved regex performance on large numbers of strings. It uses a trie data structure to compress common prefixes.

Works with Unicode!

Insertion order matters, it can affect the result of matches if you care about more than just does the string match true/false.

## Future work

- Use radix trees to improve performance when compressing long prefixes
- Compress suffixes (although this is pretty non-trivial)
- Use vistor pattern to not expose internals

## Related work

This project is based on a Clojure implementation called [Frak](https://github.com/noprompt/frak).

Radis tree implemented in Java by [thegedge](https://github.com/thegedge/radix-tree).