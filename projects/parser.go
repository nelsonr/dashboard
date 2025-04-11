package projects

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
)

type MetaData struct {
	Name         string
	Path         string
	Type         string
	ModifiedDate int64
}

func getProjectType(fullPath string) string {
	files, err := os.ReadDir(fullPath)
	if err != nil {
		fmt.Printf("Error reading path contents: %s\n", fullPath)
		fmt.Println(err)
	}

	switch true {
	case hasFileWithName(files, "tsconfig.json"):
		return "TypeScript"
	case hasFileWithExt(files, ".js"):
		return "JavaScript"
	case hasFileWithName(files, "package.json"):
		return "JavaScript"
	case hasFileWithExt(files, ".go"):
		return "Go"
	case hasFileWithExt(files, ".py"):
		return "Python"
	case hasFileWithExt(files, ".gd"):
		return "Godot"
	case hasFileWithExt(files, ".html"):
		return "HTML"
	case hasFileWithExt(files, ".c"):
		return "C"
	case hasFileWithName(files, "gleam.toml"):
		return "Gleam"
	case hasFileWithName(files, "deno.json"):
		return "Deno"
	}

	return "Unknown"
}

func hasFileWithExt(files []os.DirEntry, ext string) bool {
	for _, file := range files {
		if filepath.Ext(file.Name()) == ext {
			return true
		}
	}

	return false
}

func hasFileWithName(files []os.DirEntry, name string) bool {
	for _, file := range files {
		if filepath.Ext(file.Name()) == name {
			return file.Name() == name
		}
	}

	return false
}

func GetDirEntriesFromPath(path string) []os.DirEntry {
	entries, err := os.ReadDir(path)
	if err != nil {
		log.Fatal(err)
	}

	return entries
}

func GetMetaDataFromDirEntry(path string, dirEntry os.DirEntry) MetaData {
	info, err := dirEntry.Info()
	if err != nil {
		log.Fatal(err)
	}

	modifiedDate := info.ModTime().UnixMilli()
	fullPath := filepath.Join(path, dirEntry.Name())

	metadata := MetaData{
		Name:         dirEntry.Name(),
		Path:         fullPath,
		Type:         getProjectType(fullPath),
		ModifiedDate: modifiedDate,
	}

	return metadata
}
