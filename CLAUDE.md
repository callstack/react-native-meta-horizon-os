# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Documentation site for React Native Meta Horizon OS - a framework for building Meta Quest VR apps with React Native. Built with Rspress (static site generator) using Callstack's theme preset.

## Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production site to `build/` directory
- `npm run preview` - Preview production build locally
- `npm run check` - Run Biome linter and formatter with auto-fix
- `npm run format` - Run Biome formatter only

## Architecture

### Documentation Structure

All documentation lives in `src/` with this hierarchy:
- `src/index.md` - Landing page
- `src/docs/` - Main documentation sections
- `src/_nav.json` - Top-level navigation
- `src/docs/_meta.json` - Sidebar structure for docs section

Each directory can have a `_meta.json` file controlling sidebar ordering and labels. Files named `index.md` serve as section landing pages.

### Configuration

- `rspress.config.ts` - Main site config using `@callstack/rspress-preset` wrapper
- `biome.json` - Linter/formatter config (space indentation, single quotes for JS)

### Content Guidelines

Documentation covers:
- Getting Started: Prerequisites, creating first app, platform guidelines
- Guides: Library compatibility, UI/UX patterns, releasing apps
- Reference: Showcase app examples
