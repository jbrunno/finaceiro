import { tituloApiGateway } from '@/gateway';
import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import { GraphQLError } from 'graphql';
import { ContatoTelefone } from '@/domain/titulo/contato/contatoTelefoneDomain';
import { ContatoEndereco } from '@/domain/titulo/contato/contatoEnderecoDomain';
import { ContatoEmail } from '@/domain/titulo/contato/contatoEmailDomain';
import {
  CONTATO_ERROR_MESSAGES,
  getContatoEnderecoById,
  getContatoTelefoneById,
  patchContatoEmailById,
  patchContatoEnderecoById,
  patchContatoTelefoneById,
} from './contatoAdapter';
import {
  id,
  contatoTelefonePatchRequests,
  contatoTelefonePatchAdapter,
  contatoEnderecoPatchRequests,
  contatoEnderecoPatchAdpter,
  contatoEmailPatchRequest,
  contatoEmailPatchAdapter,
  contatoTelefoneGetRequests,
  contatoTelefoneResponseGetMock,
  contatoEnderecoGetRequests,
  contatoEnderecoResponseGetMock,
} from './contatoAdapter.mock';

describe('contatoAdapter', () => {
  const mockAdapter = makeMockAdapter(tituloApiGateway);

  describe('getContatoTelefoneById', () => {
    it('test getContatoTelefoneById adapter success', async () => {
      contatoTelefoneGetRequests(mockAdapter);

      await expect(getContatoTelefoneById(id)).resolves.toEqual(
        new ContatoTelefone(contatoTelefoneResponseGetMock),
      );
    });

    it('test getContatoTelefoneById adapter error', async () => {
      contatoTelefoneGetRequests(mockAdapter, true);

      await expect(getContatoTelefoneById(id)).rejects.toEqual(
        new GraphQLError(
          CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_UNAUTHORIZED,
        ),
      );

      await expect(getContatoTelefoneById(id)).rejects.toEqual(
        new GraphQLError(
          CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_INVALID_CREDENTIALS,
        ),
      );

      await expect(getContatoTelefoneById(id)).rejects.toEqual(
        new GraphQLError(CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_NOT_FOUND),
      );

      await expect(getContatoTelefoneById(id)).rejects.toEqual(
        new GraphQLError(
          CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(getContatoTelefoneById(id)).rejects.toEqual(
        new GraphQLError(
          CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('patchContatoTelefoneById', () => {
    it('test patchContatoTelefoneById adapter success', async () => {
      contatoTelefonePatchRequests(mockAdapter);

      await expect(
        patchContatoTelefoneById(id, contatoTelefonePatchAdapter),
      ).resolves.toEqual({
        id: ContatoTelefone.toGlobalId(id),
      });
    });

    it('test patchContatoTelefoneById adapter error', async () => {
      contatoTelefonePatchRequests(mockAdapter, true);

      await expect(
        patchContatoTelefoneById(id, contatoTelefonePatchAdapter),
      ).rejects.toEqual(
        new GraphQLError(
          CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_BAD_REQUEST,
        ),
      );

      await expect(
        patchContatoTelefoneById(id, contatoTelefonePatchAdapter),
      ).rejects.toEqual(
        new GraphQLError(
          CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_UNAUTHORIZED,
        ),
      );

      await expect(
        patchContatoTelefoneById(id, contatoTelefonePatchAdapter),
      ).rejects.toEqual(
        new GraphQLError(
          CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_INVALID_CREDENTIALS,
        ),
      );

      await expect(
        patchContatoTelefoneById(id, contatoTelefonePatchAdapter),
      ).rejects.toEqual(
        new GraphQLError(
          CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(
        patchContatoTelefoneById(id, contatoTelefonePatchAdapter),
      ).rejects.toEqual(
        new GraphQLError(
          CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('getContatoEnderecoById', () => {
    it('test getContatoEnderecoById adapter success', async () => {
      contatoEnderecoGetRequests(mockAdapter);

      await expect(getContatoEnderecoById(id)).resolves.toEqual(
        new ContatoEndereco(contatoEnderecoResponseGetMock),
      );
    });

    it('test getContatoEnderecoById adapter error', async () => {
      contatoEnderecoGetRequests(mockAdapter, true);

      await expect(getContatoEnderecoById(id)).rejects.toEqual(
        new GraphQLError(
          CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_UNAUTHORIZED,
        ),
      );

      await expect(getContatoEnderecoById(id)).rejects.toEqual(
        new GraphQLError(
          CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_INVALID_CREDENTIALS,
        ),
      );

      await expect(getContatoEnderecoById(id)).rejects.toEqual(
        new GraphQLError(CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_NOT_FOUND),
      );

      await expect(getContatoEnderecoById(id)).rejects.toEqual(
        new GraphQLError(
          CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(getContatoEnderecoById(id)).rejects.toEqual(
        new GraphQLError(
          CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('patchContatoEnderecoById', () => {
    it('test patchContatoEnderecoById adapter success', async () => {
      contatoEnderecoPatchRequests(mockAdapter);

      await expect(
        patchContatoEnderecoById(id, contatoEnderecoPatchAdpter),
      ).resolves.toEqual({ id: ContatoEndereco.toGlobalId(id) });
    });

    it('test patchContatoEnderecoById adpter erro', async () => {
      contatoEnderecoPatchRequests(mockAdapter, true);

      await expect(
        patchContatoEnderecoById(id, contatoEnderecoPatchAdpter),
      ).rejects.toEqual(
        new GraphQLError(
          CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_BAD_REQUEST,
        ),
      );

      await expect(
        patchContatoEnderecoById(id, contatoEnderecoPatchAdpter),
      ).rejects.toEqual(
        new GraphQLError(
          CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_UNAUTHORIZED,
        ),
      );

      await expect(
        patchContatoEnderecoById(id, contatoEnderecoPatchAdpter),
      ).rejects.toEqual(
        new GraphQLError(
          CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_INVALID_CREDENTIALS,
        ),
      );

      await expect(
        patchContatoEnderecoById(id, contatoEnderecoPatchAdpter),
      ).rejects.toEqual(
        new GraphQLError(
          CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(
        patchContatoEnderecoById(id, contatoEnderecoPatchAdpter),
      ).rejects.toEqual(
        new GraphQLError(
          CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('patchContatoEmailById', () => {
    it('test patchContatoEmailById adapter success', async () => {
      contatoEmailPatchRequest(mockAdapter);

      await expect(
        patchContatoEmailById(id, contatoEmailPatchAdapter),
      ).resolves.toEqual({
        id: ContatoEmail.toGlobalId(id),
      });
    });

    it('test patchContatoEmailById adapter error', async () => {
      contatoEmailPatchRequest(mockAdapter, true);

      await expect(
        patchContatoEmailById(id, contatoEmailPatchAdapter),
      ).rejects.toEqual(
        new GraphQLError(
          CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_BAD_REQUEST,
        ),
      );

      await expect(
        patchContatoEmailById(id, contatoEmailPatchAdapter),
      ).rejects.toEqual(
        new GraphQLError(
          CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_UNAUTHORIZED,
        ),
      );

      await expect(
        patchContatoEmailById(id, contatoEmailPatchAdapter),
      ).rejects.toEqual(
        new GraphQLError(
          CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_INVALID_CREDENTIALS,
        ),
      );

      await expect(
        patchContatoEmailById(id, contatoEmailPatchAdapter),
      ).rejects.toEqual(
        new GraphQLError(
          CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(
        patchContatoEmailById(id, contatoEmailPatchAdapter),
      ).rejects.toEqual(
        new GraphQLError(
          CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });
});
