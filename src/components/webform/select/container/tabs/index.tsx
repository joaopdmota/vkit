import React from 'react'

import style from 'theme/components/webform/select/select.module.scss'

import useTabs from '../../hooks/useTabs'

interface TabsListInterface {
  numSelecteds: number
  onChange: (item: number) => void
  tabActive?: number
}

const TabsList: React.FC<TabsListInterface> = ({ numSelecteds = 0, onChange, tabActive = 0 }) => {
  const { getLavalamp, getTabs, canAnimate } = useTabs(tabActive)

  return (
    <div className={style.tabsContent}>
      <div className={style.tabsBox} ref={getTabs}>
        <button
          onClick={() => onChange(0)}
          className={`${style.button} ${tabActive === 0 ? style.active : null}`}
        >
          Todos
        </button>

        <button
          onClick={() => onChange(1)}
          className={`${style.button} ${tabActive === 1 ? style.active : null}`}
        >
          {numSelecteds <= 1
            ? numSelecteds
              ? '1 Selecionado'
              : 'Selecionados'
            : `${numSelecteds} Selecionados`}
        </button>
      </div>

      <div ref={getLavalamp} className={`${style.lavalamp} ${canAnimate ? style.animate : null}`} />
    </div>
  )
}

export default TabsList
