import React from 'react'
import { SetPage, PushPage, ModalPage, RouterWapper } from 'shared/router'

import Main from 'shared/components/context/main'
import Container from 'shared/components/context/container'
import Content from 'shared/components/context/content'
import Text from 'shared/components/text'
import Menu from 'shared/components/menu'
import Button from 'shared/components/button'
import Image from 'shared/components/image'
import Chip from 'shared/components/chip'
import DayNight from 'shared/components/dayNight'
import classesBuilder from 'shared/utils/classesBuilder'
import SliderSwiper from 'shared/components/context/sliderSwiper'
import BackDrop from 'shared/components/backdrop'
import MenuTrigger from 'shared/components/menuTrigger'

import routesMock from 'shared/components/menu/menuRouter.mock'

import UsePage from './hooks/usePage'

import StructurePageType from './types/page.type'

import style from 'theme/modules/structure/page/page.module.scss'

const StructurePage: React.FC<StructurePageType> = ({
  children,
  routesGroups,
  options = {
    user: {
      name: 'Vittano(a)',
      photo: '',
    },
    description: {
      portal: 'Portal da Vitta',
      general: `${new Date().getFullYear()} © Vitta Coordenação em Saúde`,
      version: 'v0.0.0',
    },
  },
  translucent,
  baseUrl = '/',
}) => {
  const {
    isMobile,
    useIsHovered,
    useIsMenuExpand,
    useIsMenuSlider,
    useIsMenuSliderExpand,
    useHeightContent,
    useMaxHeightMenu,
    useRefSliderIntance,
    useRoutesMenu,
    getRefSidebarWrapper,
    onButtonTrigger,
    onMouseTrigger,
    onSliding,
  } = UsePage(routesGroups)

  const classNamesStructure = {
    structurePage: true,
    mobile: isMobile,
    menuExpand: useIsMenuExpand,
    menuHovered: useIsHovered,
  }

  const { description, user } = options

  const avatar = (
    <Image
      alt={user?.name}
      type="circle"
      width="30px"
      height="30px"
      size="small"
      {...(user?.photo ? { src: user.photo } : null)}
    />
  )

  const menuMobileTrigger = (): void => {
    const trigger = useIsMenuSliderExpand ? 'close' : 'open'
    useRefSliderIntance.current[trigger]()
  }

  return (
    <RouterWapper basename={baseUrl}>
      <Main translucent={translucent} fullHeight>
        <div data-cascade className={classesBuilder(style, classNamesStructure)}>
          <div data-cascade-scale>
            {isMobile ? (
              <div className={classesBuilder(style, { header: true, hide: useIsMenuSlider })}>
                <MenuTrigger onClick={menuMobileTrigger} />
                <div className={style.logo} />
                {avatar}
              </div>
            ) : null}
            <div className={style.sidebar} onMouseLeave={() => onMouseTrigger(false)}>
              <SliderSwiper
                axisX="left"
                closed
                parentMove
                onSliding={onSliding}
                instanceEmitter={useRefSliderIntance.current}
              >
                {!isMobile ? (
                  <div className={style.menuTrigger}>
                    <Button
                      icon="chevron-left-outline"
                      solo
                      rounded
                      size="larger"
                      onClick={onButtonTrigger}
                    />
                  </div>
                ) : null}
                <div
                  ref={getRefSidebarWrapper}
                  className={style.sidebarWrapper}
                  onMouseEnter={() => onMouseTrigger(true)}
                  style={{ height: useHeightContent }}
                >
                  <div className={style.logo} />
                  <div className={style.user}>
                    {!useIsMenuExpand && !useIsHovered ? (
                      avatar
                    ) : (
                      <Chip
                        label={`Olá, ${user?.name || ''}`}
                        rounded
                        size="small"
                        reverse
                        image={{
                          alt: user?.name,
                          src: user?.photo,
                        }}
                      />
                    )}
                  </div>
                  <Menu
                    callback={useRefSliderIntance.current.close}
                    routes={routesGroups?.length && useRoutesMenu ? useRoutesMenu : routesMock}
                    expand={useIsMenuExpand || useIsHovered}
                    maxHeight={useMaxHeightMenu}
                  />
                  <div className={style.themeMode}>
                    <DayNight />
                  </div>
                  <div className={style.infoFooter}>
                    <div className={style.question}>
                      <Button
                        icon="question-mark-circle-outline"
                        solo
                        color="default"
                        size="larger"
                      />
                    </div>
                    <div className={style.text}>
                      <Text
                        value={description?.portal}
                        color="light"
                        size="minor"
                        textAlign="center"
                        title
                      />
                      <Text
                        value={description?.general}
                        color="light"
                        size="minor"
                        textAlign="center"
                      />
                      <Text
                        value={description?.version}
                        color="light"
                        size="minor"
                        textAlign="center"
                      />
                    </div>
                  </div>
                </div>
              </SliderSwiper>
              {isMobile ? <div className={style.startSwipe} /> : null}
            </div>
            <div className={style.pageWrapper}>
              {isMobile && useIsMenuSlider ? (
                <BackDrop
                  show={useIsMenuSliderExpand}
                  onClose={useRefSliderIntance.current.close}
                />
              ) : null}
              <Container>
                <Content height={useHeightContent}>
                  {routesGroups?.length ? (
                    <div className={style.pages}>
                      <div>
                        <PushPage routesGroups={routesGroups} />
                      </div>

                      <SetPage routesGroups={routesGroups} />
                    </div>
                  ) : (
                    children
                  )}
                </Content>
              </Container>
            </div>
          </div>
        </div>
        {routesGroups?.length ? <ModalPage routesGroups={routesGroups} /> : null}
      </Main>
    </RouterWapper>
  )
}

export default StructurePage
