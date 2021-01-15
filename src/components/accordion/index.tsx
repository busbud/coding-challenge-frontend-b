// Packages
import React, { PropsWithChildren, useRef, useState, useEffect } from 'react'
import { IoChevronDown } from 'react-icons/io5'
import { useToggle } from 'react-use'

import * as S from './styles'

interface AccordionProps {
  trigger: React.ReactNode | string
  onTrigger?: (closed: boolean) => Promise<void>
  loading?: boolean
  space?: string
  withBorder?: boolean
}

function Accordion(props: PropsWithChildren<AccordionProps>) {
  const { trigger, onTrigger, space = '2rem', withBorder, children } = props
  const [open, toggleOpen] = useToggle(false)
  const [loading, toggleLoading] = useToggle(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const [maxHeight, setMaxHeight] = useState<string>()

  const onClick = async () => {
    toggleOpen(!open)
    if (onTrigger) {
      toggleLoading()
      await onTrigger(!open)
      toggleLoading()
    }
  }

  useEffect(() => {
    setMaxHeight(open ? `${contentRef?.current?.scrollHeight}px` : undefined)
  }, [contentRef, open, loading])

  return (
    <S.Wrapper withBorder={withBorder}>
      <S.TriggerWrapper
        space={space}
        justify="space-between"
        align="center"
        onClick={onClick}
      >
        <S.Box>
          <S.Box>{trigger}</S.Box>
          <S.Box data-testid="accordion-button">
            <S.TurnIcon turn={open}>
              <IoChevronDown height={30} />
            </S.TurnIcon>
          </S.Box>
        </S.Box>
      </S.TriggerWrapper>
      <S.Divider />
      <S.ContentWrapper ref={contentRef} maxHeight={maxHeight}>
        {!loading && <S.Box>{children}</S.Box>}
      </S.ContentWrapper>
    </S.Wrapper>
  )
}

export default Accordion
