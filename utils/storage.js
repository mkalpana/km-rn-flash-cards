import React from 'react';
import { AsyncStorage } from 'react-native';

const FLASH_CARDS_STORAGE_KEY = 'km-rn-flash-cards::storage';
const FLASH_CARDS_NOTIFICATION_KEY = 'km-rn-flash-cards::notification';

export function getDecks() {
  return new Promise((resolve, reject) => {
    try{
      AsyncStorage.getItem(FLASH_CARDS_STORAGE_KEY)
        .then(decks => JSON.parse(decks))
        .then(decks => {
          resolve(decks || {});
        });
    }
    catch(error) {
      reject(error);
    }
  });
}

export async function getDeck(id) {
  return new Promise((resolve, reject) => {
    try{
      AsyncStorage.getItem(FLASH_CARDS_STORAGE_KEY)
        .then(decks => JSON.parse(decks))
        .then(decks => {
          resolve(decks[id] || {});
        });
    }
    catch(error) {
      reject(error);
    }
  });
}

export async function saveDeckTitle(title) {
  return new Promise((resolve, reject) => {
    try{
      const newDeck = { [title]: { title, questions: [] }};
      AsyncStorage.mergeItem(FLASH_CARDS_STORAGE_KEY, JSON.stringify(newDeck))
        .then(() => resolve());
    }
    catch(error) {
      reject(error);
    }
  });
}

export async function addCardToDeck(title, card) {
  return new Promise((resolve, reject) => {
    try {
      AsyncStorage.getItem(FLASH_CARDS_STORAGE_KEY)
        .then(decks => JSON.parse(decks))
        .then(decks => {
          decks[title].questions.push(card);
          AsyncStorage.setItem(FLASH_CARDS_STORAGE_KEY, JSON.stringify(decks))
            .then(() => resolve());
        });
    }
    catch(error) {
      reject(error);
    }
  });

}

export async function clearItems() {
  return new Promise((resolve, reject) => {
    try{
      AsyncStorage.removeItem(FLASH_CARDS_NOTIFICATION_KEY);
      AsyncStorage.setItem(FLASH_CARDS_STORAGE_KEY, JSON.stringify({}))
        .then(() => {
          resolve({});
        });
    }
    catch(error) {
      reject(error);
    }
  });
}
