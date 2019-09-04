import styled from 'styled-components'
import Router from 'next/router'
import { ExpenseFilterProps } from '../types/components'
import Input from './styles/Input'
import { gts } from '../lib/getThemeStyle'
import { useState, useEffect, SyntheticEvent, ChangeEvent } from 'react'
import { getTypewriterStrings } from '../lib/filterUtils'

const StyledFilter = styled.div`
  margin-bottom: ${gts('xlMargin')}px;
  position: relative;
  input {
    width: 100%;
    padding: 10px calc(2rem + 20px) 10px 5px;
    transition: 0.2s;
    line-height: 1;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  input:focus + .search-icon {
    opacity: 1;
  }
  .search-icon {
    position: absolute;
    bottom: 10px;
    right: 10px;
    --dim: 2rem;
    display: block;
    opacity: 0.2;
    transiton: 0.2s;
    width: var(--dim);
    height: var(--dim);
    background-image: url('/static/images/search.svg');
    background-repeat: no-repeat;
    cursor: text;
  }
  @media (max-width: ${gts('mobileScreenRes')}) {
    margin-bottom: ${gts('mdMargin')}px;
  }
`

const ExpenseFilter: React.FC<ExpenseFilterProps> = ({ filterText, perPage, offset }) => {
  const [counter, changeCounter] = useState(0)
  const [filterVal, changeFilterVal] = useState(filterText)

  const placeholderStrings = getTypewriterStrings(['name', 'comment', 'merchant'])

  useEffect(() => {
    let timeoutId: undefined | number

    if (!filterVal) {
      timeoutId = setTimeout(() => {
        changeCounter((counter + 1) % (placeholderStrings.length - 1))
      }, 250)
    } else {
      clearInterval(timeoutId)
    }

    return () => clearTimeout(timeoutId)
  }, [counter, filterVal])

  useEffect(() => {
    changeFilterVal('')
  }, [offset, perPage])

  const onFilterChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) =>
    changeFilterVal(value)

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    Router.push(`/?offset=${offset}&limit=${perPage}&search=${filterVal}`)
  }

  return (
    <StyledFilter>
      <form onSubmit={onSubmit}>
        <Input
          placeholder={`Search expense by ${placeholderStrings[counter]}_`}
          id="filter"
          value={filterVal}
          onChange={onFilterChange}
          autoComplete="off"
        />
        <label htmlFor="filter" className="search-icon" />
      </form>
    </StyledFilter>
  )
}
export default ExpenseFilter
