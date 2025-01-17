import {promises as fsPromises} from 'node:fs'
import type {Meal} from './meal.js'

export async function getCanteenList(): Promise<string[]> {
	const found = await fsPromises.readdir('mensa-data', {withFileTypes: true})
	const dirs = found
		.filter(o => o.isDirectory())
		.map(o => o.name)
		.filter(o => !o.startsWith('.'))
	return dirs
}

function getFilename(
	mensa: string,
	year: number,
	month: number,
	day: number,
): string {
	let filename = `mensa-data/${mensa}/`
	filename += year.toLocaleString(undefined, {minimumIntegerDigits: 4, useGrouping: false})
	filename += month.toLocaleString(undefined, {minimumIntegerDigits: 2})
	filename += day.toLocaleString(undefined, {minimumIntegerDigits: 2})
	filename += '.json'
	return filename
}

export async function getMealsOfDay(
	mensa: string,
	year: number,
	month: number,
	day: number,
): Promise<Meal[]> {
	try {
		const filename = getFilename(mensa, year, month, day)
		const content = await fsPromises.readFile(filename, 'utf8')
		return JSON.parse(content) as Meal[]
	} catch {
		return []
	}
}
