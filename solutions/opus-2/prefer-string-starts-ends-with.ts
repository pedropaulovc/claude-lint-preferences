function isHttpUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}

function hasFileExtension(filename: string): boolean {
  return filename.endsWith(".ts") || filename.endsWith(".js");
}

function isComment(line: string): boolean {
  return line.trim().startsWith("//");
}
