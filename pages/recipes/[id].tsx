import {CustomNextPage} from "types"
import {getSidebarLayout} from "@/components/layouts/SidebarLayout"
import React from "react"
import Content from "@/components/Content"
import SingleRecipe from "@/features/recipes/SingleRecipe"

const RecipeCreatePage: CustomNextPage = () => {
  return (
    <Content>
      <SingleRecipe />
    </Content>
  )
}

RecipeCreatePage.getLayout = (page) => {
  const Layout = <>{getSidebarLayout(page)}</>
  return Layout
}

export default RecipeCreatePage
