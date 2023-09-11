import React from 'react';
import { Card, CardContent, CardHeader, Skeleton } from '@frontend/components';
import {
  CardList,
  StyledBox,
  StyledSkeleton,
} from './ClienteSearchSkeleton.styles';

interface ClienteSearchSkeletonProps {
  cards: number;
}

export function ClienteSearchSkeleton({ cards }: ClienteSearchSkeletonProps) {
  const mapArr = Array(cards).fill('');
  return (
    <CardList>
      {mapArr.map((el) => {
        return (
          <Card key={`${el}-${Math.random()}`}>
            <CardHeader
              subheader={
                <Skeleton
                  variant="rectangular"
                  height={30}
                  width="100%"
                  animation="wave"
                />
              }
            />
            <CardContent>
              <StyledBox>
                <StyledSkeleton
                  variant="rectangular"
                  height={35}
                  width="100%"
                  animation="wave"
                />
                <StyledSkeleton
                  variant="rectangular"
                  height={35}
                  width="100%"
                  animation="wave"
                />
              </StyledBox>
            </CardContent>
          </Card>
        );
      })}
    </CardList>
  );
}
