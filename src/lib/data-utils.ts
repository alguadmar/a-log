import { getCollection, type CollectionEntry } from 'astro:content'

export async function getAllPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog')
  return posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}

export async function getRecentPosts(
  count: number,
): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getAllPosts()
  return posts.slice(0, count)
}

export async function getAdjacentPosts(currentId: string): Promise<{
  prev: CollectionEntry<'blog'> | null
  next: CollectionEntry<'blog'> | null
}> {
  const posts = await getAllPosts()
  const currentIndex = posts.findIndex((post) => post.id === currentId)

  if (currentIndex === -1) {
    return { prev: null, next: null }
  }

  return {
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
  }
}

export async function getAllAuthors(): Promise<CollectionEntry<'authors'>[]> {
  return await getCollection('authors')
}

export async function getAllProjects(): Promise<CollectionEntry<'projects'>[]> {
  const projects = await getCollection('projects')
  return projects.sort((a, b) => {
    const dateA = a.data.startDate?.getTime() || 0
    const dateB = b.data.startDate?.getTime() || 0
    return dateB - dateA
  })
}

export async function getAllTags(): Promise<Map<string, number>> {
  const posts = await getAllPosts()
  const projects = await getAllProjects()
  
  const tagMap = new Map<string, number>()
  
  // Agregar tags de posts
  posts.forEach(post => {
    post.data.tags?.forEach(tag => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
    })
  })
  
  // Agregar tags de proyectos
  projects.forEach(project => {
    project.data.tags?.forEach(tag => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
    })
  })
  
  return tagMap
}

export async function getSortedTags(): Promise<
  { tag: string; count: number }[]
> {
  const tagCounts = await getAllTags()

  return [...tagCounts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => {
      const countDiff = b.count - a.count
      return countDiff !== 0 ? countDiff : a.tag.localeCompare(b.tag)
    })
}

export function groupPostsByYear(
  posts: CollectionEntry<'blog'>[],
): Record<string, CollectionEntry<'blog'>[]> {
  return posts.reduce(
    (acc: Record<string, CollectionEntry<'blog'>[]>, post) => {
      const year = post.data.date.getFullYear().toString()
      ;(acc[year] ??= []).push(post)
      return acc
    },
    {},
  )
}

export async function parseAuthors(authorIds: string[] = []) {
  if (!authorIds.length) return []

  const allAuthors = await getAllAuthors()
  const authorMap = new Map(allAuthors.map((author) => [author.id, author]))

  return authorIds.map((id) => {
    const author = authorMap.get(id)

    return {
      id,
      name: author?.data?.name || id,
      avatar: author?.data?.avatar || '/static/logo.png',
      isRegistered: !!author,
    }
  })
}

export async function getPostsByAuthor(
  authorId: string,
): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.data.authors?.includes(authorId))
}

export async function getPostsByTag(
  tag: string,
): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.data.tags?.includes(tag))
}

export async function getProjectsByTag(
  tag: string,
): Promise<CollectionEntry<'projects'>[]> {
  const projects = await getAllProjects()
  return projects.filter((project) => project.data.tags?.includes(tag))
}

export async function getPostsByProject(
  projectId: string,
): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getAllPosts()
  const project = await getCollection('projects').then(
    (projects) => projects.find((p) => p.id === projectId)
  )
  
  if (!project || !project.data.relatedPosts || project.data.relatedPosts.length === 0) {
    console.log(`No relatedPosts found for project ${projectId}`);
    return []
  }
  
  console.log(`Found relatedPosts for project ${projectId}:`, project.data.relatedPosts);
  
  // Convertir los posts relacionados a un array de resultados
  const result: CollectionEntry<'blog'>[] = [];
  
  // Para cada ID en relatedPosts, buscar el post correspondiente
  for (const relatedPostId of project.data.relatedPosts) {
    // Buscar el post que coincida con el ID en relatedPosts
    const matchingPost = posts.find(post => {
      // Comparación directa
      if (post.id === relatedPostId) return true;
      
      // Extraer la última parte del ID del post si contiene una barra
      const postIdParts = post.id.split('/');
      const shortPostId = postIdParts[postIdParts.length - 2] + '/' + postIdParts[postIdParts.length - 1];
      
      return shortPostId === relatedPostId;
    });
    
    if (matchingPost) {
      result.push(matchingPost);
    } else {
      console.log(`No matching post found for ID: ${relatedPostId}`);
    }
  }
  
  console.log(`Found ${result.length} related posts for project ${projectId}`);
  return result;
}

export async function getAdjacentProjectPosts(
  projectId: string,
  currentPostId: string,
): Promise<{
  prev: CollectionEntry<'blog'> | null
  next: CollectionEntry<'blog'> | null
}> {
  const relatedPosts = await getPostsByProject(projectId)
  
  if (relatedPosts.length === 0) {
    console.log(`No related posts found for project ${projectId}`);
    return { prev: null, next: null }
  }
  
  // Extraer la última parte del ID del post para comparar
  let shortPostId = currentPostId;
  if (currentPostId.includes('/')) {
    const parts = currentPostId.split('/');
    if (parts.length >= 2) {
      shortPostId = parts[parts.length - 2];
    }
  }
  
  console.log(`Finding adjacent posts for post ID: ${currentPostId} (short: ${shortPostId})`);
  
  // Buscar el índice del post actual en la lista de posts relacionados
  const currentIndex = relatedPosts.findIndex((post) => {
    // Extraer también el ID corto del post actual para comparar
    let postShortId = post.id;
    if (post.id.includes('/')) {
      const parts = post.id.split('/');
      if (parts.length >= 2) {
        postShortId = parts[parts.length - 2];
      }
    }
    
    return post.id === currentPostId || postShortId === shortPostId;
  });
  
  console.log(`Current post index in related posts: ${currentIndex}`);
  
  if (currentIndex === -1) {
    return { prev: null, next: null }
  }
  
  return {
    next: currentIndex > 0 ? relatedPosts[currentIndex - 1] : null,
    prev: currentIndex < relatedPosts.length - 1 ? relatedPosts[currentIndex + 1] : null,
  }
}

export async function getProjectForPost(
  postId: string
): Promise<{
  project: CollectionEntry<'projects'> | null
  index: number
  total: number
}> {
  // Obtener todos los proyectos
  const projects = await getCollection('projects')
  
  // Extraer la última parte del ID del post si contiene una barra
  let shortPostId = postId;
  if (postId.includes('/')) {
    const postIdParts = postId.split('/');
    shortPostId = postIdParts[postIdParts.length - 2] + '/' + postIdParts[postIdParts.length - 1];
  }
  
  console.log(`Looking for project containing post ID: ${postId} (short ID: ${shortPostId})`);
  
  // Buscar el proyecto que contiene este post
  for (const project of projects) {
    if (!project.data.relatedPosts) continue
    
    // Buscar si el proyecto contiene este post (usando ID completo o corto)
    const index = project.data.relatedPosts.findIndex(id => {
      return id === postId || id === shortPostId;
    });
    
    if (index !== -1) {
      console.log(`Found post in project ${project.id} at index ${index}`);
      // Si encontramos el post en este proyecto, retornamos la info
      return {
        project,
        index, // Posición en el índice del proyecto (0-based)
        total: project.data.relatedPosts.length // Total de posts en el proyecto
      }
    }
  }
  
  console.log(`Post ${postId} not found in any project`);
  // Si no encontramos el post en ningún proyecto
  return { project: null, index: -1, total: 0 }
}
