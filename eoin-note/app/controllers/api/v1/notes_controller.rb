class Api::V1::NotesController < Api::V1::BaseController

  # /api ~> GET: all notes
  def index
    respond_with Note.all
  end

  # /api/create ~> POST: create new note
  def create
    respond_with :api, :v1, Note.create(note_params)
  end

  # /api/destroy ~> POST: destroy note
  def destroy
    respond_with Note.destroy(params[:id])
  end

  # /api/update ~> POST: Update a note
  def update
    note = Note.find(params["id"])
    note.update_attributes(note_params)
    respond_with note, json: note
  end

  private

  def note_params
    params.require(:note).permit(:id, :content, :title, :lastEdited)
  end

end
