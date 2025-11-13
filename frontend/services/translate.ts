import api from './api'

/**
 * Translate text using DeepL API
 */
export async function translateText(
  text: string,
  sourceLang: string = 'ja',
  targetLang: string = 'en'
): Promise<string> {
  const response = await api.post<{ translation: string }>('/translate/text', {
    text,
    sourceLang,
    targetLang,
  })
  return response.data.translation
}

/**
 * Translate image (OCR + translation)
 */
export async function translateImage(
  imageUrl: string,
  targetLang: string = 'en'
): Promise<string> {
  const response = await api.post<{ translation: string }>('/translate/image', {
    imageUrl,
    targetLang,
  })
  return response.data.translation
}

