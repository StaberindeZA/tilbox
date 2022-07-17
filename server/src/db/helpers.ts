import {promises as fsPromises} from 'fs';
import {TilListItem} from '../types';
import {v4 as uuidv4} from 'uuid';

const dbFileLocation = `${__dirname}/db.json`;

async function getTil(): Promise<TilListItem[]> {
  const data = await fsPromises.readFile(dbFileLocation, {
    encoding: 'utf8',
  });
  return JSON.parse(data);
}

export async function getAllTil(): Promise<TilListItem[]> {
  // Return all TILs
  try {
    return await getTil();
  } catch (err) {
    console.log('Failing here right?');
    console.error(err);
    throw err;
  }
}

export async function createTil(til: {url: string; summary: string}) {
  // Create a new TIL
  try {
    const tils = await getTil();
    tils.push({
      ...til,
      id: uuidv4(),
      createdAt: Date.now(),
    });
    await fsPromises.writeFile(dbFileLocation, JSON.stringify(tils));
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateTil() {
  // Update an existing Til
}

export async function deleteTil() {
  // Delete an existing Til
}
