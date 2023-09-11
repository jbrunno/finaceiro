import { dashboardApiGateway } from '@/gateway/dashboard/dashboardApiGateway';
import { Icm } from '@/domain/dashboard/icm/icmDomain';
import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import { GraphQLError } from 'graphql';
import { icm, ICM_ERROR_MESSAGES } from './icmAdapter';
import { icm as icmMock, icmRequests } from './icmAdapter.mock';

describe('icmAdapter', () => {
  const mockAdapter = makeMockAdapter(dashboardApiGateway);

  describe('icm', () => {
    it('test icm adapter success', async () => {
      icmRequests(mockAdapter);

      await expect(icm()).resolves.toEqual(new Icm(icmMock));
    });

    it('test icm adapter error', async () => {
      icmRequests(mockAdapter, true);

      await expect(icm()).rejects.toEqual(
        new GraphQLError(ICM_ERROR_MESSAGES.DASHBOARD_ICM_ERROR_BAD_REQUEST),
      );

      await expect(icm()).rejects.toEqual(
        new GraphQLError(
          ICM_ERROR_MESSAGES.DASHBOARD_ICM_ERROR_SOMETHING_WENT_WRONG,
        ),
      );
      await expect(icm()).rejects.toEqual(
        new GraphQLError(
          ICM_ERROR_MESSAGES.DASHBOARD_ICM_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });
});
