import path from "path";

const regexPathSeparator = path.sep === "/" ? "/" : "\\\\";

const slash = (s: string): string => {
    return s.replace(/\\/g, "/");
};

export const processFullPath = (
    fullPath: string
): Partial<{ path: string; file: string }> => {
    const cwd = process.cwd();
    const noCwdPath = fullPath.replace(cwd, "");

    const pathSeparationPattern = new RegExp(
        `(${regexPathSeparator}.+${regexPathSeparator})(.+)$`
    );
    const pathSeparationResult = noCwdPath.match(pathSeparationPattern);

    const path = pathSeparationResult?.[1];
    const file = pathSeparationResult?.[2];

    return {
        path: path && slash(path),
        file: file && slash(file),
    };
};
