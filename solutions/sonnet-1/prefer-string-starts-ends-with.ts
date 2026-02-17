function isHttpUrl(url: string): boolean {
    return url.indexOf('http://') === 0 || url.indexOf('https://') === 0;
}

function hasFileExtension(filename: string): boolean {
    return filename.endsWith('.ts') || filename.endsWith('.js');
}

function isComment(line: string): boolean {
    return line.trim().indexOf('//') === 0;
}
