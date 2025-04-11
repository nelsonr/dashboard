package main

import (
	"context"
	"dashboard/projects"
	"log"
	"os/exec"
	"syscall"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Parses the project directories from a given path
func (a *App) LoadProjects() []projects.MetaData {
	path := "C:/Users/Nelson Rodrigues/Code/"
	dirEntries := projects.GetDirEntriesFromPath(path)

	var dirEntriesMetadata []projects.MetaData

	for _, entry := range dirEntries {
		dirEntriesMetadata = append(dirEntriesMetadata, projects.GetMetaDataFromDirEntry(path, entry))
	}

	return dirEntriesMetadata
}

func (a *App) OpenProject(path string) {
	println(path)

	cmd := exec.Command("code", path)

	// Don't flash a command line window on screen
	cmd.SysProcAttr = &syscall.SysProcAttr{
		HideWindow: true,
	}

	if err := cmd.Run(); err != nil {
		log.Fatal(err)
	}
}
