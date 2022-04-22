import { byTestId } from '../../../../testing/src'

export class ModalPage {
  modal = byTestId('modal')
  openModalButton = byTestId('open-modal-button')
  closeModalButton = byTestId('open-modal-close')

  open() {
    cy.page('/components/notice/bal-modal')
  }
}