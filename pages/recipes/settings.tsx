import {CustomNextPage} from "types"
import {getSidebarLayout} from "@/components/layouts/SidebarLayout"
import React from "react"
import Content from "@/components/Content"
import RecipeSettings from "@/features/recipes/recipeSettings"

const RecipeSettingsPage: CustomNextPage = () => {
  return (
    <Content>
      <RecipeSettings />
    </Content>
  )
}

RecipeSettingsPage.getLayout = (page) => {
  const Layout = <>{getSidebarLayout(page)}</>
  return Layout
}

export default RecipeSettingsPage
