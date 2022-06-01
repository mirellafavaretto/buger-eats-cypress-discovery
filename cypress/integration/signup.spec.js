/// <reference types="cypress" />

import signup from '../pages/SignupPage'

import signupFactory from '../factories/SignupFactory'
import SignupPage from '../pages/SignupPage';

describe('Signup', () => {
    // beforeEach(function () {
    //     cy.fixture('deliver.json').then((d) => { //(d) é a abreviação de deliver
    //         this.deliver = d

    //     })
    // });

    it('User should be deliver', function () {

        var deliver = signupFactory.deliver()

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)

    });

    it('Invalid Document', function () {

        var deliver = signupFactory.deliver()

        deliver.cpf = '00000000aa'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! CPF inválido')


    });

    it('Invalid email', function () {

        var deliver = signupFactory.deliver()

        deliver.email = 'user.com.br'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')

    })

    context('Required fields', function () {

        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }

        ]

        before(function () {
            SignupPage.go()
            SignupPage.submit()

        });

        messages.forEach(function (msg) {
            it(`${msg.field} is required`, function () {
                SignupPage.alertMessageShouldBe(msg.output)
            });


        })

    })


});