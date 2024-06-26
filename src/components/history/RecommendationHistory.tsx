import { Box } from '@mui/system';
import { useState } from 'react';

import { HistoryItem } from './HistoryItem';
import { StyledBoxContainer, StyledButton, StyledDescription, StyledHistoryItem, StyledTitle } from './styles/recommendationsHistoryStyles';
import TypographyText from '@app/components/base/TypographyText';
import MovieThumbnail from '@app/components/MovieThumbnail';
import { RecommendationsHistoryItem } from '@app/components/types/RecommendationsHistoryItem';

export function RecommendationHistory({ history }: { history: RecommendationsHistoryItem[] }) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RecommendationsHistoryItem | null>(null);

  const handleClickOpen = (item: RecommendationsHistoryItem) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const getMovieName = (suggestion: string) => {
    const suggestionNamePattern = /'([^']+)'/;
    const match = suggestion.match(suggestionNamePattern);
    return match ? match[1] : null;
  };

  return (
    <StyledBoxContainer>
      <StyledTitle variant="h5">Last Recommendations</StyledTitle>
      <StyledDescription variant="body2">We use the data from your previous searches to provide better recommendations for your new searches.</StyledDescription>
      {Array.isArray(history) &&
        history.slice(0, 10).map((item, index) => {
          const movieName = getMovieName(item.suggestion);
          if (!movieName) return null;
          return (
            <StyledHistoryItem key={index}>
              <Box display="flex" alignItems="center">
                <MovieThumbnail movieName={movieName} />
                <TypographyText variant="body1">{movieName}</TypographyText>
              </Box>
              <StyledButton id={`history-${index}`} onClick={() => handleClickOpen(item)}>
                DETAILS
              </StyledButton>
            </StyledHistoryItem>
          );
        })}

      <HistoryItem open={open} handleClose={handleClose} selectedItem={selectedItem} />
    </StyledBoxContainer>
  );
}
