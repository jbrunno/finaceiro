import { gqlTestRequest } from '@test-utils/gqlTestRequest';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import { CBO_ERROR_MESSAGES } from '@/adapters/titulo/cbo/cboAdapter';
import { Cbo } from '@/domain/titulo/cbo/cboDomain';
import { Pagination } from '@bff/domain/pagination';
import { tituloApiGateway } from '@/gateway';
import {
  CBO_PAGINATION,
  cboPaginationRequests,
  cbos,
} from './cboResolver.mock';

describe('cboResolver', () => {
  const mockAdapter = makeMockAdapter(tituloApiGateway);

  describe('cboPagination', () => {
    const { totalItems, ...args } = cbos.pagination;

    it('test cboPagination query success', async () => {
      cboPaginationRequests(mockAdapter);

      const cbosPagination = new Pagination({
        pagination: cbos.pagination,
        items: cbos.items.map((cbo) => new Cbo(cbo)),
      });

      const response = await gqlTestRequest(CBO_PAGINATION, {
        variables: { pagination: args, filter: faker.random.word() },
        headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.cbos.items).toEqual(cbosPagination.items);
      expect(response.data.cbos.pageInfo).toEqual(cbosPagination.pageInfo);
    });

    it('test cboPagination query error', async () => {
      cboPaginationRequests(mockAdapter, true);

      const response = () =>
        gqlTestRequest(CBO_PAGINATION, {
          variables: { pagination: args, filter: faker.random.word() },
          headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
        });

      const [error401] = (await response()).errors || [];
      expect(error401?.message).toEqual(
        CBO_ERROR_MESSAGES.TITULO_CBO_ERROR_UNAUTHORIZED,
      );

      const [error403] = (await response()).errors || [];
      expect(error403?.message).toEqual(
        CBO_ERROR_MESSAGES.TITULO_CBO_ERROR_INVALID_CREDENTIALS,
      );

      const [error500] = (await response()).errors || [];
      expect(error500?.message).toEqual(
        CBO_ERROR_MESSAGES.TITULO_CBO_ERROR_SOMETHING_WENT_WRONG,
      );

      const [error503] = (await response()).errors || [];
      expect(error503?.message).toEqual(
        CBO_ERROR_MESSAGES.TITULO_CBO_ERROR_SERVICE_UNAVAILABLE,
      );
    });
  });
});
