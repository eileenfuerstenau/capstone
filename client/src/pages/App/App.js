import BookCardsPage from '../BookCardsPage/BookCardsPage'
import { Route, Switch } from 'react-router-dom'
import Grid from '../../components/Grid/Grid'
import Navigation from '../../components/Navigation/Navigation'
import VotingPage from '../VotingPage/VotingPage'
import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import styled from 'styled-components/macro'
import postNominatedBook from '../../services/postNominatedBook'
import getNominatedBooks from '../../services/getNominatedBooks'
import deleteBook from '../../services/deleteBook'

export default function App() {
  const [nominatedBooks, setNominatedBooks] = useState([])

  useEffect(() => {
    getNominatedBooks().then(data => setNominatedBooks([...data]))
  }, [])

  function nominateBook(id, title, author, description) {
    const newNominatedBook = { id, title, author, description }
    setNominatedBooks([newNominatedBook, ...nominatedBooks])
    postNominatedBook(id, title, author, description)
  }
  function handleDeleteBook(_id) {
    deleteBook(_id).then(() => {
      const updatedBooks = nominatedBooks.filter(book => book._id !== _id)
      setNominatedBooks([...updatedBooks])
    })
  }

  console.log(nominatedBooks)

  return (
    <Grid>
      <Switch>
        <Route exact path="/">
          <ExtendedHeader>Lass dich inspirieren</ExtendedHeader>
          <BookCardsPage
            onNominate={nominateBook}
            nominatedBooks={nominatedBooks}
          />
        </Route>
        <Route exact path="/voting">
          <Header>Wofür stimmst du?</Header>
          <VotingPage
            nominatedBooks={nominatedBooks}
            onDelete={handleDeleteBook}
          />
        </Route>
      </Switch>
      <Navigation />
    </Grid>
  )
}

const ExtendedHeader = styled(Header)`
  height: 80px;
  z-index: 5;
`
