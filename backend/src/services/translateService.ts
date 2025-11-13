import axios from 'axios'

const deeplApiKey = process.env.DEEPL_API_KEY

export const translateService = {
  /**
   * Translate text using DeepL API
   */
  async translateText(
    text: string,
    sourceLang: string = 'ja',
    targetLang: string = 'en'
  ): Promise<string> {
    if (!deeplApiKey) {
      // Fallback to a simple placeholder if DeepL is not configured
      console.warn('DEEPL_API_KEY is not set, returning original text')
      return text
    }

    try {
      const response = await axios.post(
        'https://api-free.deepl.com/v2/translate',
        {
          text: [text],
          source_lang: sourceLang.toUpperCase(),
          target_lang: targetLang.toUpperCase(),
        },
        {
          headers: {
            Authorization: `DeepL-Auth-Key ${deeplApiKey}`,
            'Content-Type': 'application/json',
          },
        }
      )

      return response.data.translations[0].text
    } catch (error: any) {
      console.error('Error translating text:', error)
      throw new Error('Failed to translate text')
    }
  },

  /**
   * Translate image (OCR + translation)
   */
  async translateImage(imageUrl: string, targetLang: string = 'en'): Promise<string> {
    // TODO: Implement OCR + translation
    // This would:
    // 1. Use OCR to extract text from image
    // 2. Translate the extracted text
    // 3. Return translated text

    throw new Error('Image translation not yet implemented')
  },
}

