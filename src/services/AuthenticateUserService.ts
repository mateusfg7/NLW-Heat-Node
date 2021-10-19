import axios from 'axios'

/**
 * X Receber code(string)
 * X Recuperar o access_token no github
 * Recuperar infos do user no github
 * Verificar se o usuário existe no banco de dados
 * --- SIM = Gera um token
 * --- NÃO = Cria no DB, gera um token
 * Retornar o token com as infos do user
 */

interface IAccessTokenResponse {
  access_token: string
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = 'https://github.com/login/oauth/access_token'

    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      headers: {
        "Accept": "application/json"
      }
    })

    return accessTokenResponse.access_token
  }
}

export { AuthenticateUserService }