require "application_system_test_case"

class CoachesTest < ApplicationSystemTestCase
  setup do
    @coach = coaches(:one)
  end

  test "visiting the index" do
    visit coaches_url
    assert_selector "h1", text: "Coaches"
  end

  test "creating a Coach" do
    visit coaches_url
    click_on "New Coach"

    fill_in "Bio", with: @coach.bio
    fill_in "Name", with: @coach.name
    fill_in "Position", with: @coach.position
    click_on "Create Coach"

    assert_text "Coach was successfully created"
    click_on "Back"
  end

  test "updating a Coach" do
    visit coaches_url
    click_on "Edit", match: :first

    fill_in "Bio", with: @coach.bio
    fill_in "Name", with: @coach.name
    fill_in "Position", with: @coach.position
    click_on "Update Coach"

    assert_text "Coach was successfully updated"
    click_on "Back"
  end

  test "destroying a Coach" do
    visit coaches_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Coach was successfully destroyed"
  end
end
