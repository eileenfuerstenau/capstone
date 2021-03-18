import { books } from '../../material/bookdata.json'
import BookCard from '../BookCard/BookCard'
import styled from 'styled-components/macro'
import React, { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'

export default function BookCardsPage({ onNominate, nominatedBooks }) {
  const [bookmarkedBooks, setBookmarkedBooks] = useState([])
  const [booksShown, setBooksShown] = useState('all')
  const [descriptionExtended, setDescriptionExtended] = useState([])
  const [userInput, setUserInput] = useState('')

  let bookmarkedBooksArray
  function onBookmarkClick(currentBook) {
    if (bookmarkedBooks.includes(currentBook)) {
      bookmarkedBooksArray = bookmarkedBooks.filter(
        book => book !== currentBook
      )
    } else {
      bookmarkedBooksArray = [...bookmarkedBooks, currentBook]
    }
    setBookmarkedBooks(bookmarkedBooksArray)
  }

  return (
    <CardsPageLayout>
      <TabBarWrapper>
        <SearchBar userInput={userInput} setUserInput={setUserInput} />
        <PageButton
          aria-label="filter-all"
          isActive={booksShown === 'all'}
          onClick={() => {
            setBooksShown('all')
            setDescriptionExtended([])
          }}
        >
          Alle
        </PageButton>
        <PageButton
          aria-label="filter-favorites"
          isActive={booksShown === 'favorites'}
          onClick={() => {
            setBooksShown('favorites')
            setDescriptionExtended([])
          }}
        >
          Favoriten
        </PageButton>
      </TabBarWrapper>
      <BooksWrapper>
        {books
          .filter(
            book => booksShown === 'all' || bookmarkedBooks.includes(book.title)
          )
          .filter(
            book =>
              book.title.toLowerCase().includes(userInput.toLowerCase()) ||
              book.author.toLowerCase().includes(userInput.toLowerCase())
          )
          .map(card => (
            <BookCard
              key={card.id}
              cover={card.cover}
              title={card.title}
              author={card.author}
              description={card.content}
              onBookmarkClick={onBookmarkClick}
              bookmarkedBooks={bookmarkedBooks}
              descriptionExtended={descriptionExtended}
              setDescriptionExtended={setDescriptionExtended}
              onNominate={onNominate}
              nominatedBooks={nominatedBooks}
            />
          ))}
      </BooksWrapper>
      <NoFavoritesStatement>
        {bookmarkedBooks.length === 0 && booksShown === 'favorites'
          ? 'Du hast noch keine Favoriten.'
          : ' '}
      </NoFavoritesStatement>
    </CardsPageLayout>
  )
}

const CardsPageLayout = styled.div`
  position: relative;
  padding: 2%;
  overflow-y: scroll;
  &:first-child {
    padding-top: 105px;
  }
`
const TabBarWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: white;
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 2;
  padding: 10px;
  border-radius: 0 0 10px 10px;
`

const BooksWrapper = styled.div`
  padding: 0 2% 0 2%;
  display: grid;
  gap: 10px;
`

const PageButton = styled.button`
  border: none;
  border-bottom: ${props =>
    props.isActive ? '2px solid #f1613d' : '2px solid transparent'};
  background: transparent;
  font-size: 100%;
  padding: 5px;
  justify-self: center;
  margin-top: 5px;
`
const NoFavoritesStatement = styled.p`
  text-align: center;
`
