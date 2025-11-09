const i18nInit = (i18nInstance) => {
  const elements = document.querySelectorAll('[data-translate]')
  for (const element of elements) {
    const key = element.dataset.translate
    element.innerText = i18nInstance.t(key)
  }
}

export default i18nInit
