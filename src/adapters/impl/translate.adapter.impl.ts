import translate from 'translate'

import { TranslateAdapter, TranslateOptions } from '../translate.adapter'
import { languages } from '@/constants/languages'

class TranslateAdapterImpl implements TranslateAdapter {
	private readonly defaultOptions: TranslateOptions
	constructor() {
		this.defaultOptions = { from: languages.en.code, to: languages.pt.code }
	}
	async execute(sentence: string, options?: TranslateOptions): Promise<string> {
		return await translate(sentence, {
			from: options?.from || this.defaultOptions.from,
			to: options?.to || this.defaultOptions.to
		})
	}
}

export const makeTranslateAdapter = () => new TranslateAdapterImpl()
