import { React } from 'react'
import styled from 'styled-components/macro'
import Button from '../Button/Button'
import PropTypes from 'prop-types'
import Icon from 'supercons'

export default function BookCardShort({
  id,
  title,
  author,
  description,
  descriptionExtended,
  setDescriptionExtended,
  onDelete,
}) {
  let descriptionsExpandedArray
  function readmore(title) {
    if (descriptionExtended.includes(title)) {
      descriptionsExpandedArray = descriptionExtended.filter(
        book => book !== title
      )
    } else {
      descriptionsExpandedArray = [...descriptionExtended, title]
    }
    setDescriptionExtended(descriptionsExpandedArray)
  }

  return (
    <Card key={id} id={id}>
      <section>
        <Title>
          {title} von {author}
        </Title>
        <Description>
          <span hidden={!descriptionExtended.includes(title)}>
            {description}
          </span>
        </Description>
        <Button
          aria-label="expand-shrink-description"
          onClick={() => readmore(title)}
        >
          {descriptionExtended.includes(title) ? 'Weniger' : 'Mehr'}
        </Button>
      </section>
      <DeleteButton aria-label="delete-nominated" onClick={() => onDelete(id)}>
        <Icon style={{ color: 'var(--darkgrey)' }} glyph="delete" size={35} />
      </DeleteButton>
    </Card>
  )
}

BookCardShort.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  description: PropTypes.string,
  descriptionExtended: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  setDescriptionExtended: PropTypes.func,
}

const Card = styled.section`
  border-radius: 5px;
  box-shadow: 0 2px 5px;
  padding: 5px 10px 10px 10px;
  position: relative;
`
const Title = styled.h2`
  font-weight: bold;
  font-size: 90%;
  padding-right: 40px;
`

const Description = styled.p`
  font-weight: normal;
  font-size: 70%;
`
const DeleteButton = styled.button`
  background: transparent;
  border: none;
  position: absolute;
  right: 0;
  bottom: 0;
`
