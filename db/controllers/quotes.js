
const {db} = require('..');
const { Quotes } = db.models;
const { Op } = db.Sequelize;
/**
 * Gets all quotes
 * @param None
 */
const getQuotes = () => {
  return new Promise(async (resolve, reject) => {
    const quotes = await Quotes.findAll();
    resolve(quotes)
  });
}

/**
 * Gets a specific quote by ID
 * @param {number} id - Accepts the ID of the specified quote.
 */
async function getQuote(id) {
  return new Promise(async (resolve, reject) => {
    const quotes = await Quotes.findAll({
      where: {
        id
      },
    });
    resolve(quotes)
  });
}

/**
 * Creates a new quote record 
 * @param {Object} newRecord - Object containing info for new quote: the quote text and author 
 */
async function createQuote(newRecord) {
  return new Promise(async (resolve, reject) => {
    const quote = await Quotes.build(newRecord);
    await quote.save();
    resolve(quote)

  });
}

/**
 * Updates a single record 
 * @param {Object} newQuote - An object containing the changes to quote: quote and author 
 */
async function updateQuote(data,id) {
  return new Promise(async (resolve, reject) => {
    const quote = await Quotes.findByPk(id);
    await quote.update(data);
    resolve(quote)

  });
}

/**
 * Deletes a single record
 * @param {Object} record - Accepts record to be deleted. 
 */
async function deleteQuote(id) {
  return new Promise(async (resolve, reject) => {
    const quote = await Quotes.findByPk(id);
    await quote.destroy();
    resolve(true)

  });
}

module.exports = {
  getQuotes,
  getQuote,
  createQuote,
  updateQuote,
  deleteQuote,
}
