/**
 * Helper functions to fix image paths in content collections
 */

import { promises as fs } from 'fs'
import path from 'path'

/**
 * Resolves image paths in content collections by ensuring they exist and are accessible
 * in both development and production.
 * 
 * @param relativePath The relative path to the image from the content file
 * @param contentPath The path to the content file containing the image reference
 * @returns The fully resolved absolute path
 */
export async function resolveContentImage(relativePath: string, contentPath: string): Promise<string> {
  if (!relativePath.startsWith('./')) {
    // If it's already an absolute path or a URL, return it directly
    return relativePath
  }

  // Get the directory of the content file
  const contentDir = path.dirname(contentPath)
  
  // Resolve the image path relative to the content file
  const resolvedPath = path.join(contentDir, relativePath)
  
  try {
    // Check if the file exists
    await fs.access(resolvedPath)
    return resolvedPath
  } catch (error) {
    console.error(`Error accessing image at ${resolvedPath}:`, error)
    // Fall back to a default image or return the original path
    return relativePath
  }
}

/**
 * Validates that an image exists in the file system
 * 
 * @param imagePath The path to validate
 * @returns True if the image exists, false otherwise
 */
export async function validateImagePath(imagePath: string): Promise<boolean> {
  try {
    await fs.access(imagePath)
    return true
  } catch {
    return false
  }
}