import { Box, Button, Divider } from '@mui/material'
import CustomCheckbox from './CustomCheckbox'
import CustomTypography from './CustomTypography'
import PageRow from './PageRow'
import { COLORS, SPACING } from '../constants/colors'
import { usePageSelection } from '../hooks/usePageSelection'
import { useRowInteraction } from '../hooks/useRowInteraction'

export type PageItem = {
  id: string
  label: string
}

export type PagesModalProps = {
  pages?: PageItem[]
  initialSelected?: string[]
  onDone?: (selectedIds: string[]) => void
  title?: string
}

const PagesModal = ({
  pages = [],
  initialSelected = [],
  onDone,
  title = 'All pages',
}: PagesModalProps) => {
  const { selected, allSelected, handleToggle, handleToggleAll, getSelectedArray } = 
    usePageSelection(pages, initialSelected)
  
  const headerInteraction = useRowInteraction()

  const handleDoneClick = () => {
    onDone?.(getSelectedArray())
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: COLORS.background.page,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Box
        sx={{
          width: `${SPACING.card.width}px`,
          maxWidth: '90vw',
          borderRadius: `${SPACING.card.borderRadius}px`,
          border: `1px solid ${COLORS.border}`,
          boxShadow: COLORS.shadow.card,
          backgroundColor: COLORS.background.card,
          display: 'flex',
          flexDirection: 'column',
          py: `${SPACING.card.padding}px`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pl: `${SPACING.row.paddingLeft}px`,
            pr: `${SPACING.row.paddingRight}px`,
            py: `${SPACING.row.paddingVertical}px`,
            height: `${SPACING.row.height}px`,
            cursor: 'pointer',
            transition: 'background-color 0.15s ease',
            '&:hover': {
              backgroundColor: COLORS.background.hover,
            },
            flexShrink: 0,
          }}
          onClick={handleToggleAll}
          {...headerInteraction.handlers}
        >
          <CustomTypography variant="header">{title}</CustomTypography>
          <CustomCheckbox
            checked={allSelected}
            onChange={handleToggleAll}
            ariaLabel="select all pages"
            isHovering={headerInteraction.isHovering}
            isPressed={headerInteraction.isPressed}
          />
        </Box>

        <Divider
          sx={{
            mx: `${SPACING.divider.marginHorizontal}px`,
            my: `${SPACING.divider.marginVertical}px`,
            borderColor: COLORS.divider,
            borderBottomWidth: '0.7px',
          }}
        />

        <Box
          sx={{
            height: `${SPACING.scrollArea.height}px`,
            overflowY: 'auto',
            flex: '1 1 auto',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {pages.map((page) => (
            <PageRow
              key={page.id}
              label={page.label}
              checked={selected.has(page.id)}
              onToggle={() => handleToggle(page.id)}
            />
          ))}
        </Box>

        <Divider
          sx={{
            mx: `${SPACING.divider.marginHorizontal}px`,
            my: `${SPACING.divider.marginVertical}px`,
            borderColor: COLORS.divider,
            borderBottomWidth: '0.7px',
          }}
        />

        <Box sx={{ px: `${SPACING.row.paddingRight}px`, pt: '10px', pb: '10px', flexShrink: 0 }}>
          <Button
            variant="contained"
            onClick={handleDoneClick}
            fullWidth
            aria-label="Done"
            sx={{
              height: `${SPACING.button.height}px`,
              backgroundColor: COLORS.primary.main,
              color: COLORS.text.secondary,
              fontSize: '16px',
              fontWeight: 500,
              px: '20px',
              textTransform: 'none',
              borderRadius: `${SPACING.button.borderRadius}px`,
              boxShadow: 'none',
              transition: 'background-color 0ms',
              '&:hover': {
                backgroundColor: COLORS.primary.hover,
                boxShadow: 'none',
              },
              '&:active': {
                backgroundColor: COLORS.primary.active,
                boxShadow: 'none',
              },
            }}
          >
            Done
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default PagesModal
