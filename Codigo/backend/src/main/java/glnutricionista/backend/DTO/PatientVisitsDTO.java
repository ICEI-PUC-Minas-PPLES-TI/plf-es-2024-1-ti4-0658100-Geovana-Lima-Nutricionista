package glnutricionista.backend.DTO;

public class PatientVisitsDTO {
    private String name;
    private Long visitas;

    public PatientVisitsDTO(String name, Long visitas) {
        this.name = name;
        this.visitas = visitas;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getVisitas() {
        return visitas;
    }

    public void setVisitas(Long visitas) {
        this.visitas = visitas;
    }
}
