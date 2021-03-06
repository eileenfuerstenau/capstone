import styled from 'styled-components/macro'
import BookCardShort from '../../components/BookCardShort/BookCardShort'
import { useState } from 'react'
import deleteBook from '../../services/deleteBook'
import Button from '../../components/Button/Button'
import voteBook from '../../services/voteBook'
import getNominatedBooks from '../../services/getNominatedBooks'

export default function VotingPage({ setNominatedBooks, nominatedBooks }) {
  const [descriptionExtended, setDescriptionExtended] = useState([])
  const [isVoted, setIsVoted] = useState([])
  const [hasVoted, setHasVoted] = useState(false)

  function handleDeleteBook(id) {
    deleteBook(id).then(() => {
      const updatedBooks = nominatedBooks.filter(book => book._id !== id)
      setNominatedBooks([...updatedBooks])
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    isVoted.forEach(id => voteBook(id))
    setIsVoted([])
    setHasVoted(true)
    getNominatedBooks().then(data => setNominatedBooks([...data]))
  }

  return (
    <VotingPageLayout>
      <Form onSubmit={handleSubmit}>
        <BooksWrapper>
          {hasVoted ?? nominatedBooks.sort((a, b) => b.votes - a.votes)}
          {nominatedBooks.map(({ _id, title, author, description, votes }) => (
            <BookCardShort
              key={_id}
              id={_id}
              title={title}
              author={author}
              description={description}
              votes={votes}
              descriptionExtended={descriptionExtended}
              setDescriptionExtended={setDescriptionExtended}
              onDelete={handleDeleteBook}
              isVoted={isVoted}
              setIsVoted={setIsVoted}
              hasVoted={hasVoted}
            />
          ))}
          <EmptyShortListStatement>
            {nominatedBooks.length === 0 && 'Die Shortlist ist noch leer.'}
          </EmptyShortListStatement>
        </BooksWrapper>
        <SubmitButton disabled={isVoted.length === 0 || hasVoted}>
          {hasVoted ? 'Erfolgreich abgestimmt' : 'Gib deine Stimme ab'}
        </SubmitButton>
      </Form>
    </VotingPageLayout>
  )
}

const VotingPageLayout = styled.main`
  position: relative;
  padding: 5px;
`
const BooksWrapper = styled.div`
  padding: 0 10px;
  display: grid;
  gap: 10px;
  border: 1px solid var(--darkgrey);
  height: 70vh;
  overflow-y: scroll;
  align-content: start;
  border-radius: 10px;
`
const Form = styled.form`
  display: grid;
`
const SubmitButton = styled(Button)`
  width: 50%;
  padding: 10px;
  background: ${props => props.disabled && 'lightgrey'};
  box-shadow: ${props => props.disabled && 'none'};
  justify-self: center;
  align-self: center;
  margin: 10px;
`
const EmptyShortListStatement = styled.div`
  text-align: center;
  padding: 10px;
`
