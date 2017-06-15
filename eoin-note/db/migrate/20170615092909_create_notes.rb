class CreateNotes < ActiveRecord::Migration[5.1]
  def change
    create_table :notes do |t|
      t.string :content
      t.string :title
      t.date :lastEdited

      t.timestamps
    end
  end
end
