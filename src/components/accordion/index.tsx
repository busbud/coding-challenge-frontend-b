// Packages
import React, { PropsWithChildren, useRef, useState, useEffect } from 'react'
import { IoChevronDown } from 'react-icons/io5'
import { useToggle } from 'react-use'

// Styles
import * as S from './styles'
import * as L from 'layout'

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
        <L.Box>
          {trigger}
          <L.Box data-testid="accordion-button">
            <L.TurnIcon turn={open}>
              <IoChevronDown height={30} />
            </L.TurnIcon>
          </L.Box>
        </L.Box>
      </S.TriggerWrapper>
      <S.ContentWrapper ref={contentRef} maxHeight={maxHeight}>
        {!loading && <L.Box>{children}</L.Box>}
      </S.ContentWrapper>
    </S.Wrapper>
  )
}

export default Accordion
