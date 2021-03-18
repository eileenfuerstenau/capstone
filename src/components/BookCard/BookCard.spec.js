import BookCard from './BookCard'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const testdataShort = {
  id: '3',
  cover: '/book-cover/3.jpg',
  title: 'Schnelles Denken, langsames Denken',
  author: 'Daniel Kahneman',
  description:
    'Wie treffen wir unsere Entscheidungen? Warum ist Zögern ein überlebensnotwendiger Reflex?',
  bookmarkedBooks: '[Becoming]',
  isDescriptionExtended: '[Herr aller Dinge]',
  nominatedBooks: [
    {
      author: 'Paulo Coelho',
      title: 'Veronika beschließt zu sterben',
      description:
        'Die Geschichte einer unglücklichen jungen Frau, die sterben will und erst angesichts des Todes entdeckt, wie schön das Leben sein kann, wenn man darum kämpft und etwas riskiert.',
      id: '21',
    },
  ],
}

const testdataLong = {
  id: '3',
  cover: '/book-cover/3.jpg',
  title: 'Schnelles Denken, langsames Denken',
  author: 'Daniel Kahneman',
  description:
    'Wie treffen wir unsere Entscheidungen? Warum ist Zögern ein überlebensnotwendiger Reflex, und warum ist es so schwer zu wissen, was uns in der Zukunft glücklich macht?',
  bookmarkedBooks: '[Becoming]',
  isDescriptionExtended: '[Herr aller Dinge]',
  nominatedBooks: [
    {
      author: 'Paulo Coelho',
      title: 'Veronika beschließt zu sterben',
      description:
        'Die Geschichte einer unglücklichen jungen Frau, die sterben will und erst angesichts des Todes entdeckt, wie schön das Leben sein kann, wenn man darum kämpft und etwas riskiert.',
      id: '21',
    },
  ],
}

describe('BookCard', () => {
  it('renders a cover image, a booktitle, an author and a book description up to 100 characters', () => {
    render(<BookCard {...testdataShort} />)
    expect(screen.getByAltText('cover')).toBeInTheDocument()
    expect(
      screen.getByText('Schnelles Denken, langsames Denken')
    ).toBeInTheDocument()
    expect(screen.getByText('Daniel Kahneman')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Wie treffen wir unsere Entscheidungen? Warum ist Zögern ein überlebensnotwendiger Reflex?'
      )
    ).toBeInTheDocument()
  })
})

it('does not render a book description of more than 100 characters by default', () => {
  render(<BookCard {...testdataLong} />)
  expect(
    screen.getByText(
      'ist es so schwer zu wissen, was uns in der Zukunft glücklich macht?'
    )
  ).not.toBeVisible()
})

it('renders a book description of more than 100 characters if read-more button was clicked', () => {
  render(<BookCard {...testdataLong} />)
  const extendButton = screen.getByRole('button', {
    name: 'expand-shrink-description',
  })
  userEvent.click(extendButton)
  expect(
    screen.getByText(
      'ist es so schwer zu wissen, was uns in der Zukunft glücklich macht?'
    )
  ).toBeVisible()
})

/*
  it('calls onBookmarkClick with the respective booktitle on clicking the bookmark button', () => {
    const callback = jest.fn()
    render(
      <BookCard
        title="Booktitle"
        author="John Doe"
        cover="/book-cover/1.jpg"
        description="Wie treffen wir unsere Entscheidungen? Warum ist Zögern ein überlebensnotwendiger Reflex, und warum ist es so schwer zu wissen, was uns in der Zukunft glücklich macht?"
        bookmarkedBooks="[Foo]"
        isDescriptionExtended="[booktitle]"
        nominatedBooks="[booktitle]"
      />
    )
    const bookmarkButton = screen.getByRole('button', {
      name: 'toggle-bookmarked',
    })
    userEvent.click(bookmarkButton)
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('Booktitle')
  })
}) 
*/
