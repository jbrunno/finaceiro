import {
  Grid,
  PageHeader,
  PageHeaderProps,
  Skeleton,
} from '@frontend/components';

type DiscadorHeaderProps = PageHeaderProps & {
  className?: string;
};

export function DiscadorHeader({ title, ...props }: DiscadorHeaderProps) {
  const titleComponent = title || (
    <Grid item xs={4}>
      <Skeleton
        variant="rectangular"
        height={46}
        animation="wave"
        width="100%"
      />
    </Grid>
  );

  return (
    <PageHeader title={titleComponent} {...props}>
      <Grid item xs container direction="row" justifyContent="flex-end">
        {/* {user?.agentId && (
            <DiscadorButton campanhaAtiva={user.campanhaAtiva} />
          )} */}
      </Grid>
    </PageHeader>
  );
}
