function isHttpUrl(url: string): boolean {
  return url.indexOf('http://') === 0 || url.indexOf('https://') === 0;
}

function hasFileExtension(filename: string): boolean {
  return filename.slice(-3) === '.ts' || filename.slice(-3) === '.js';
}

function isComment(line: string): boolean {
  return line.trim().indexOf('//') === 0;
}
