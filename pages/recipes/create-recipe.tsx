import {CustomNextPage} from "types"
import {getSidebarLayout} from "@/components/layouts/SidebarLayout"
import React from "react"
import Content from "@/components/Content"
import CreateRecipeForm from "@/features/recipes/CreateRecipeForm"

const RecipeCreatePage: CustomNextPage = () => {
  return (
    <Content>
      <CreateRecipeForm />
    </Content>
  )
}

RecipeCreatePage.getLayout = (page) => {
  const Layout = <>{getSidebarLayout(page)}</>
  return Layout
}

export default RecipeCreatePage
