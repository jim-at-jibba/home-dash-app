import {CustomNextPage} from "types"
import {getSidebarLayout} from "@/components/layouts/SidebarLayout"
import React from "react"
import Content from "@/components/Content"
import CreateBbcRecipeForm from "@/features/recipes/CreateBbcRecipeForm"

const RecipeBbcCreatePage: CustomNextPage = () => {
  return (
    <Content>
      <CreateBbcRecipeForm />
    </Content>
  )
}

RecipeBbcCreatePage.getLayout = (page) => {
  const Layout = <>{getSidebarLayout(page)}</>
  return Layout
}

export default RecipeBbcCreatePage
