import React from 'react'

import { BaseField, WrapField } from 'components/webform/builder/container/field'

import style from 'theme/components/webform/select/search.module.scss'

import classesBuilder from 'shared/utils/classesBuilder'

interface SerachInterface {
  onSearch: (...item: any) => void
  term: string
}

const Search: React.FC<SerachInterface> = ({ onSearch, term }) => (
  <WrapField
    className={classesBuilder(style, { search: true, clearable: !!term })}
    style={style}
    body={
      <BaseField
        clearable
        icon="search"
        iconDir="right"
        onChange={onSearch}
        onClear={onSearch}
        style={style}
        value={term}
      />
    }
  />
)

export default Search
