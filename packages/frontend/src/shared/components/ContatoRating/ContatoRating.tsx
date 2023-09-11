import { Rating, RatingProps, Tooltip } from '@frontend/components';
import {
  useContatoRating,
  UseContatoRatingProps,
} from './hooks/useContatoRating';

type ContatoRatingProps = Omit<RatingProps, 'value' | 'onChange'> &
  UseContatoRatingProps & {
    className?: string;
  };

export function ContatoRating({
  value,
  onChange,
  className,
  ...props
}: ContatoRatingProps) {
  const { tooltipTitle, internalValue, handleChange, handleChangeActive } =
    useContatoRating({ value, onChange });

  return (
    <Tooltip
      className={className}
      title={tooltipTitle}
      arrow
      placement="bottom"
    >
      <Rating
        value={internalValue}
        precision={1}
        max={3}
        onChange={handleChange}
        onChangeActive={handleChangeActive}
        {...props}
      />
    </Tooltip>
  );
}
