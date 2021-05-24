import {CustomNextPage} from "types"
import {getSidebarLayout} from "@/components/layouts/SidebarLayout"
import React from "react"
import Content from "@/components/Content"
import Recipes from "@/features/recipes/Recipes"

const RecipesPage: CustomNextPage = () => {
  return (
    <Content>
      <Recipes />
    </Content>
  )
}

RecipesPage.getLayout = (page) => {
  const Layout = <>{getSidebarLayout(page)}</>
  return Layout
}

export default RecipesPage
